from bs4 import BeautifulSoup as BS
import requests as rq


url = 'https://www.nifs.go.kr/page?id=li_fwf_regi_01'

if(rq.get(url).status_code != 200):
	print("error : 잘못된 페이지를 참조했습니다.")

res = rq.get(url)
soup = BS(res.content, 'lxml')
tbody = soup.find('table', {'class': 'table02 mt5'})
tds = tbody.find_all("td")
head_div = soup.find(id='body_content')
title = head_div.find('h4').text.strip()

# 동적데이터 수집 실패 -> None 반환
if(tds == None):
	print('error : 데이터를 가져오는데 실패했습니다.')
	sys.exit()

totallist = []

for idx, td in enumerate(tds):
	if idx >= 0:
		totallist.append(td.text.strip())

file = open('fish_name.txt', 'w')
file.write('----- ' + title + ' -----\n') # the name of the category


i=0
while i < len(totallist):
	file.write(totallist[i] + '\n')
	i=i+6

file.close()
