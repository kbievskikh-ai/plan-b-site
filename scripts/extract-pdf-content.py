#!/usr/bin/env python3
"""
Извлекает текст из PDF-отчётов Plan B и генерит черновики для report-content.ts

ЗАПУСК:
    cd /root/projects/plan-b-site
    pip install pdfplumber --break-system-packages
    python3 scripts/extract-pdf-content.py

РЕЗУЛЬТАТ:
    scripts/output/<slug>.md  — черновик на вычитку по каждому отчёту

⚠️  ЭТО ЧЕРНОВИКИ. Не вставлять в сайт без вычитки.
    Под отчётами стоит имя Константина и CRECI-SC 59616-F.
    Ошибка в цифре = репутационный риск.

ПОРЯДОК РАБОТЫ:
    1. Запустить скрипт → получить .md черновики
    2. Вычитать глазами (особенно цифры, цены, доходности)
    3. Перенести вычитанное в src/data/report-content.ts
    4. Билд, деплой, проверка curl'ом
"""

import os
import re
import sys
import unicodedata
from pathlib import Path

try:
    import pdfplumber
except ImportError:
    sys.exit("pip install pdfplumber --break-system-packages")

PUBLIC = Path("public")
OUT = Path("scripts/output")

# Отчёты → их title в API (нужно для совпадения slug'а).
# Сверить с: curl -s https://plan-b-admin-api-production.up.railway.app/api/research?limit=50
PDF_TO_TITLE = {
    "PlanB_Jurere_Investment.pdf": "Jurerê Investment Report",
    "PlanB_Campeche_Investment.pdf": "Campeche Investment Report",
    "PlanB_Canasvieiras_Investment.pdf": "Canasvieiras Investment Report",
    "PlanB_Ingleses_Investment.pdf": "Ingleses Investment Report",
    "PlanB_PortoBelo_Investment_2026.pdf": "Porto Belo Investment Report 2026",
    "PlanB_PortoBelo_Area_Investment.pdf": "Porto Belo Area Investment",
    "PlanB_Itapema_Investment_2026.pdf": "Itapema Investment Report 2026",
    "PlanB_BC_Investment_2026.pdf": "Balneário Camboriú Investment Report 2026",
    "PlanB_RanchoQueimado_Investment_2026.pdf": "Rancho Queimado Investment Report 2026",
    "PlanB_Florianopolis_Report_2026.pdf": "Florianópolis Report 2026",
    "PlanB_SC_Market_Outlook_2027.pdf": "SC Market Outlook 2027",
    "PlanB_Rental_Yield_SC_2026.pdf": "Rental Yield SC 2026",
    "PlanB_Best_Areas_SC_2026.pdf": "Best Areas SC 2026",
    "PlanB_SC_Investment_Guide_2026.pdf": "SC Investment Guide 2026",
    "PlanB_Foreign_Buyers_Guide_2026.pdf": "Foreign Buyers Guide 2026",
    "PlanB_CBA_Developer_Review_2026.pdf": "CBA Developer Review 2026",
    "PlanB_CFL_Developer_Review_2026.pdf": "CFL Developer Review 2026",
    "PlanB_Hantei_Developer_Review_2026.pdf": "Hantei Developer Review 2026",
    "PlanB_Modulare_Developer_Review_2026.pdf": "Modulare Developer Review 2026",
    "PlanB_OAD_Developer_Review_2026.pdf": "OAD Developer Review 2026",
}


def slugify(s: str) -> str:
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def clean(text: str) -> str:
    """Чистим типичный мусор PDF-экстракции."""
    # склеенные слова после переносов
    text = re.sub(r"(?<=[a-z])(?=[A-Z])", " ", text)
    # колонтитулы Plan B
    text = re.sub(r"Plan B Brazil\s*·\s*planbbrazil\.com\s*Page \d+", "", text)
    text = re.sub(r"PLAN B\s+[A-Z\s&]{3,}", "", text)
    # лишние пробелы
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def is_heading(line: str) -> bool:
    line = line.strip()
    if not (3 < len(line) < 70):
        return False
    if line.endswith((".", ",", ";", ":")):
        return False
    words = line.split()
    if len(words) > 8:
        return False
    # Заголовки обычно с Заглавных
    caps = sum(1 for w in words if w and w[0].isupper())
    return caps >= max(1, len(words) - 1)


def extract(pdf_path: Path) -> list[dict]:
    sections: list[dict] = []
    current = {"heading": "Overview", "paragraphs": []}

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            raw = page.extract_text() or ""
            for block in clean(raw).split("\n\n"):
                block = block.strip()
                if not block or len(block) < 20:
                    continue
                first = block.split("\n")[0]
                if is_heading(first) and len(block.split("\n")) > 1:
                    if current["paragraphs"]:
                        sections.append(current)
                    body = "\n".join(block.split("\n")[1:]).strip()
                    current = {
                        "heading": first.strip(),
                        "paragraphs": [body] if body else [],
                    }
                else:
                    current["paragraphs"].append(block.replace("\n", " "))

    if current["paragraphs"]:
        sections.append(current)
    return sections


def main() -> None:
    if not PUBLIC.exists():
        sys.exit("Запускай из корня plan-b-site (там, где папка public/)")

    OUT.mkdir(parents=True, exist_ok=True)
    done = 0

    for pdf_name, title in PDF_TO_TITLE.items():
        path = PUBLIC / pdf_name
        if not path.exists():
            print(f"  пропуск (нет файла): {pdf_name}")
            continue

        slug = slugify(title)
        try:
            sections = extract(path)
        except Exception as e:
            print(f"  ОШИБКА {pdf_name}: {e}")
            continue

        md = OUT / f"{slug}.md"
        with md.open("w", encoding="utf-8") as f:
            f.write(f"# {title}\n\n")
            f.write(f"slug: `{slug}`\n")
            f.write(f"источник: `{pdf_name}`\n\n")
            f.write("> ЧЕРНОВИК. Вычитать перед публикацией — особенно цифры.\n\n---\n\n")
            for s in sections:
                f.write(f"## {s['heading']}\n\n")
                for p in s["paragraphs"]:
                    f.write(f"{p}\n\n")

        print(f"  ✓ {slug}.md  ({len(sections)} секций)")
        done += 1

    print(f"\nГотово: {done} черновиков в {OUT}/")
    print("\nДальше:")
    print("  1. Вычитать .md глазами (цифры! цены! доходности!)")
    print("  2. Перенести в src/data/report-content.ts")
    print("  3. npm run build && vercel --prod")


if __name__ == "__main__":
    main()
