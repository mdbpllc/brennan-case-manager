# statute-pass §3 normalizer, PLUS the two contexts characterized 2026-09-08 (PROPOSED amendment — nothing in §3 is edited
# until Michael adopts it). Same shape as §3's published block: a list of (name, regex) pairs replaced by ONE SPACE in list
# order — with ONE pre-pass ahead of the list for the article-A run, whose replacement is not a single space.
import re, sys, collections, os
ARTICLE_A = re.compile(r'(?<=[.):,;"])AAAAA(?=[a-z])')   # PROPOSED: `SOCIETY.AAAAAcooperative` → `SOCIETY. A cooperative` — runs FIRST
ARTIFACTS = [
    ("paren",     re.compile(r'(?<=\))AA')),
    ("period",    re.compile(r'(?<=\.)AA')),
    ("colon",     re.compile(r'(?<=:)AA')),
    ("quote",     re.compile(r'(?<=")AA')),
    ("comma",     re.compile(r'(?<=,)AA')),
    ("lower",     re.compile(r'(?<=[a-z])AA(?=[A-Za-z0-9("])')),
    ("secnum",    re.compile(r'(?<=\.)A(?=\d)')),
    ("semicolon", re.compile(r'(?<=;)AA')),                # PROPOSED: `services;AAand` → `services; and`
]
APOS = re.compile(r'[ \t]+(?=’)')
def normalize(raw):
    t = raw; subs = collections.Counter()
    t, n = ARTICLE_A.subn(' A ', t); subs['article-A'] += n
    for name, rx in ARTIFACTS:
        t, n = rx.subn(' ', t); subs[name] += n
    t, n = APOS.subn('', t); subs['apos'] += n
    return t, subs
if __name__ == '__main__':
    for f in sys.argv[1:]:
        raw = open(f, encoding='utf-8', errors='replace').read()
        t, subs = normalize(raw)
        open(f.replace('.txt', '.norm2'), 'w', encoding='utf-8').write(t)
        allres = re.findall(r'\S{0,12}(?<!\s)AA(?!\s)\S{0,12}', t)
        print(os.path.basename(f), dict(subs), "residual glued AA sites:", len(allres), allres[:12])
