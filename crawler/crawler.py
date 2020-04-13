from selenium import webdriver
from bs4 import BeautifulSoup as BS
import sys
import requests as rq
import re

url = 'http://www.icferry.or.kr/dmstc/nvg/monthlist.do?menuKey=20'

if(rq.get(url).status_code != 200):
	print("error : 잘못된 페이지를 참조했습니다.")

path = '/home/jim/crawler/crawler/chromedriver_linux64/chromedriver'
driver = webdriver.Chrome(path)
driver.get(url)
soup = BS(driver.page_source, 'lxml')
tbody = soup.find(id="cl_body")
tds = tbody.find_all("td")

if(tds == None):
	print('error : 데이터를 가져오는데 실패했습니다.')
	sys.exit()

totallist = []

for idx, td in enumerate(tds):
	if idx >= 0:
		totallist.append(td.text.strip())

print(totallist)

print("리스트의 2번째 항목을 참조합니다.")
print("totallist[2] == ", totallist[2])

