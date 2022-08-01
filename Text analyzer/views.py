
from django.http import HttpResponse
from django.shortcuts import render

def index(request):
	return render(request,'index2.html')

def analyze(request):
	# get the text from the analyzer
	text = request.GET.get('text','default')
	removepunc = request.GET.get('removepunc','off')
	fullcaps = request.GET.get('fullcaps','off')
	lineRemover = request.GET.get('lineRemover','off')
	extraSpaceRemover = request.GET.get('extraSpaceRemover','off')
	charCount = request.GET.get('charCount','off')
	panctuations = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''
	

	if(removepunc=='on'):
		analyzed = ""
		for char in text:
			if char not in panctuations:
				analyzed = analyzed+char

		param = {'purpose':'Remove Punctuation','analyzed_text':analyzed}

	#analyze the text
	# return HttpResponse('removepunc')
		return render(request,'analyzed2.html',param)
	elif(fullcaps=='on'):
		analyzed2 = ""
		analyzed2=analyzed2+text.upper()
		param = {'purpose':'Convert into Uppercase','analyzed_text':analyzed2}
		return render(request,'analyzed2.html',param)

	elif(lineRemover=='on'):
		analyzed = ""
		for char in text:
			if char!='\n':
				analyzed=analyzed+char
		param = {'purpose':'Remove New Lines','analyzed_text':analyzed}
		return render(request,'analyzed2.html',param)

	elif(charCount=='on'):
		count = 0
		for char in text:
			if char!=' ':
				count+=1
		param = {'purpose':'Remove New Lines','analyzed_text':count}
		return render(request,'analyzed2.html',param)

	elif(extraSpaceRemover=='on'):
		analyzed = ""
		analyzed = analyzed + text.strip()
		# limit = len(text)-1
		# for index,char in enumerate(text):
		# 	if(index+1==limit):
		# 		break
		# 	if(not(char[index]==" " and char[index+1]==" ")):
		# 		analyzed = analyzed+char

		param = {'purpose':'Extra Space Remover','analyzed_text':analyzed}
		return render(request,'analyzed2.html',param)

	else:
		return HttpResponse("<h1>Error :(</h1>")


def ex1(request):
	return render(request,'ex1.html')



# def capfirst(request):
#     return HttpResponse("capitalize first")

# def newlineremove(request):
#     return HttpResponse("newline remove first")


# def spaceremove(request):
#     return HttpResponse("space remover back")

# def charcount(request):
#     return HttpResponse("charcount")