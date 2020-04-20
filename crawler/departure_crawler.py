from selenium import webdriver
from bs4 import BeautifulSoup as BS
import sys
import requests as rq
import time

# set the basic source websites
url = 'http://www.icferry.or.kr/dmstc/nvg/monthlist.do?menuKey=20'
path = '/home/jim/git/seawatch/crawler/chromedriver'

j=1
while j<6:
	if(rq.get(url).status_code != 200):
		print("error : 잘못된 페이지를 참조했습니다.")
		break
	driver = webdriver.Chrome(path)
	driver.get(url)
	soup = BS(driver.page_source, 'lxml')
	tbody = soup.find(id="cl_body")
	tds = tbody.find_all("td")
	driver.quit()
	totallist = []
	# 리스트로 참조 가능 -> totallist[2]
	
	for idx, td in enumerate(tds):
		if idx >= 0:
			totallist.append(td.text.strip())

	time_info = time.strftime('%c', time.localtime(time.time()))
	counting= str(j)+"번째 크롤링: "+time_info
	print('%s'%counting)

	# log file area
	if(tds != None):
		result_crawling = 'extracting success: '
	else:
		result_crawling = 'Failed to extract: '
	
	log_data = result_crawling + time_info + "\n"
	with open('log_departure_crawler.txt', 'a') as f:
		f.write(log_data)

	# 동적데이터 수집 실패 -> Returning 'None' & Terminating the program
	if(tds == None):	
		print('Error : 데이터를 가져오는데 실패했습니다.')
		sys.exit()

	# Saving the result of crawling as a form of text file.
	file = open('depart_info.txt', 'w')
	for i in range(len(totallist)):
		file.write(totallist[i] + '\n')
	file.close()
	j = j+1
	time.sleep(5)
	
