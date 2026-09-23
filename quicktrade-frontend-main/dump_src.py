# dump_src.py
"""
Dump the entire src/ folder into a single .txt file.

Usage:
    python dump_src.py                    # uses ./src and writes to ./src_dump.txt
    python dump_src.py --src src --out frontend_src.txt
    python dump_src.py --include-ext .jsx .js .css .json .html
    python dump_src.py --exclude-dir assets node_modules
"""

import argparse
import os
from datetime import datetime
from pathlib import Path


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

DEFAULT_SRC = "src"
DEFAULT_OUT = "src_dump.txt"

# Folders to skip no matter what (build artifacts, caches, deps)
ALWAYS_SKIP_DIRS = {
    "node_modules",
    ".git",
    ".venv",
    "venv",
    "__pycache__",
    "dist",
    "build",
    ".next",
    ".vite",
    ".cache",
}

# File extensions to include by default.
# If None, all files are included.
DEFAULT_INCLUDE_EXTS = {
    ".jsx", ".js", ".ts", ".tsx",
    ".css", ".scss", ".sass",
    ".json", ".html",
    ".svg", ".txt", ".md",
    ".env.example",
}

# Files to skip by exact name
SKIP_FILES = {
    ".DS_Store",
    "Thumbs.db",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def should_skip_dir(dir_path: Path, extra_skips: set) -> bool:
    name = dir_path.name
    if name in ALWAYS_SKIP_DIRS:
        return True
    if name in extra_skips:
        return True
    return False


def should_include_file(file_path: Path, include_exts) -> bool:
    if file_path.name in SKIP_FILES:
        return False
    if include_exts is None:
        return True
    return file_path.suffix.lower() in include_exts


def is_probably_binary(file_path: Path) -> bool:
    """Peek at the first 1024 bytes to see if it looks binary."""
    try:
        with open(file_path, "rb") as f:
            chunk = f.read(1024)
        if b"\x00" in chunk:
            return True
        return False
    except Exception:
        return True


def file_size_human(size_bytes: int) -> str:
    for unit in ("B", "KB", "MB", "GB"):
        if size_bytes < 1024:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.1f} TB"


def walk_src(src_dir: Path, extra_skip_dirs: set):
    """
    Yield (folder_rel, file_path) for every included file,
    sorted so the output is stable between runs.
    """
    for root, dirs, files in os.walk(src_dir):
        root_path = Path(root)

        # In-place filter of dirs so os.walk skips them
        dirs[:] = sorted(
            d for d in dirs if not should_skip_dir(root_path / d, extra_skip_dirs)
        )

        for filename in sorted(files):
            file_path = root_path / filename
            if not should_include_file(file_path, DEFAULT_INCLUDE_EXTS):
                continue
            yield root_path, file_path


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Dump src/ to a single txt file.")
    parser.add_argument("--src", default=DEFAULT_SRC, help="Source folder (default: src)")
    parser.add_argument("--out", default=DEFAULT_OUT, help="Output file (default: src_dump.txt)")
    parser.add_argument(
        "--exclude-dir",
        nargs="*",
        default=[],
        help="Additional folder names to skip (e.g. assets)",
    )
    parser.add_argument(
        "--all-exts",
        action="store_true",
        help="Include every file, regardless of extension.",
    )
    args = parser.parse_args()

    src_dir = Path(args.src).resolve()
    out_path = Path(args.out).resolve()

    if not src_dir.exists() or not src_dir.is_dir():
        print(f"ERROR: source folder not found: {src_dir}")
        return 1

    extra_skip_dirs = set(args.exclude_dir or [])

    include_exts = None if args.all_exts else DEFAULT_INCLUDE_EXTS

    # Collect files first so we can show counts
    collected = list(walk_src(src_dir, extra_skip_dirs))

    if not collected:
        print(f"No files matched under {src_dir}")
        return 1

    total = len(collected)
    print(f"Found {total} files under {src_dir}")
    print(f"Writing to {out_path}")

    with open(out_path, "w", encoding="utf-8") as out:
        # -------- Banner --------
        out.write("=" * 100 + "\n")
        out.write("COMBINED OUTPUT FROM SRC FOLDER\n")
        out.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        out.write(f"Source: {src_dir}\n")
        out.write(f"Total files: {total}\n")
        out.write("=" * 100 + "\n\n")

        for folder, file_path in collected:
            rel_folder = folder.relative_to(src_dir.parent)  # e.g. src\components
            rel_file = file_path.relative_to(src_dir.parent)  # e.g. src\components\header.jsx

            # Skip binary-looking files unless --all-exts
            if not args.all_exts and is_probably_binary(file_path):
                print(f"  skipping binary: {rel_file}")
                continue

            try:
                size = file_path.stat().st_size
                content = file_path.read_text(encoding="utf-8", errors="replace")
            except Exception as e:
                print(f"  failed to read {rel_file}: {e}")
                continue

            # -------- File header --------
            out.write("=" * 100 + "\n")
            out.write(f"📁 FOLDER: {rel_folder.as_posix()}\n")
            out.write(f"📄 FILE: {file_path.name}\n")
            out.write(f"📌 PATH: {rel_file.as_posix()}\n")
            out.write(f"📝 EXTENSION: {file_path.suffix}\n")
            out.write(f"📦 SIZE: {file_size_human(size)}\n")
            out.write("=" * 100 + "\n\n")

            # -------- File content --------
            out.write(content)
            if not content.endswith("\n"):
                out.write("\n")
            out.write("\n")

            print(f"  ✓ {rel_file}")

    print()
    print(f"Done. Written: {out_path}")
    print(f"Output size: {file_size_human(out_path.stat().st_size)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())