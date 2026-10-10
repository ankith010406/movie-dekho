import urllib.request
import re
import json

movies = ['RRR', 'Pushpa 2', 'Kalki 2898 AD', 'Kantara', '3 Idiots', 'Dangal', 'Jawan', 'Vikram 2022', 'Stree 2', 'Interstellar', 'Oppenheimer', 'Dune Part Two', 'The Dark Knight']
results = []
for m in movies:
    try:
        url = 'https://www.themoviedb.org/search?query=' + urllib.parse.quote(m)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # TMDB posters in search are usually in <img loading="lazy" class="poster" src="..."
        # or data-src
        match = re.search(r'src="([^"]+w94_and_h141_bestv2[^"]+)"', html)
        if match:
            results.append(match.group(1).replace('w94_and_h141_bestv2', 'w500'))
        else:
            match2 = re.search(r'data-src="([^"]+w94_and_h141_bestv2[^"]+)"', html)
            if match2:
                results.append(match2.group(1).replace('w94_and_h141_bestv2', 'w500'))
            else:
                results.append('')
    except Exception as e:
        results.append('')
print(json.dumps(results))
