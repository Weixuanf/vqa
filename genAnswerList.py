import pandas as pd
import csv
from AnswerPreProcessor import AnswerPreProcessor
from HumanAgreementLabels import AgreementMeasureFactory
from HumanAgreementLabels.ExactStringMatch import ExactStringMatch
from HumanAgreementLabels.Entropy import Entropy
from HumanAgreementLabels.OneDisagreement import OneDisagreement
from collections import Counter


def resultToCsv(data,j):
	# only select 2 columns
	answer = data[["annotation","Answer.vqa_answer"]]

	# to delete null value
	#answer = answer.fillna(value = 0,axis=0)
	#answer =answer[answer["Answer.vqa"]!=0]
	#answer.drop("Answer.vqa",axis = 1,inplace = True)

	ans = {k: list(v) for k,v in answer.groupby("annotation")["Answer.vqa_answer"]}

	ansPreProcessor = AnswerPreProcessor()
	#answerList = []
	
	exact = ExactStringMatch()
	entropy = Entropy()
	onedisagree = OneDisagreement()
	aggreement = {}
	#diversity = {}

	for i in ans:
		curAnswers = ans[i]
		curAnswers = ansPreProcessor.preprocessAnsList(curAnswers)
		divAnswers = Counter(curAnswers)
		uniqueAnswers = divAnswers.keys()
		divAnswers = dict(divAnswers)
		ansCount = len(uniqueAnswers)

		exactLabel = exact.produceLabel(divAnswers) #the exact match label
		entropyLabel = entropy.produceLabel(divAnswers) #THE Entropy VALUE WRONG? I DONT'T KNOW WHY, PLEASE HELP ME SEE -- Weixuan
		onedisagreeLabel = onedisagree.produceLabel(divAnswers) #the one disagreement match label
		#print (i, exactLabel, entropyLabel,onedisagreeLabel)
		aggreement[i]=[exactLabel, entropyLabel,onedisagreeLabel,ansCount]
		aggreement[i].append(divAnswers.copy())
		#diversity[i] = ansCount 
		#print(divAnswers,onedisagreeLabel,ansCount)

	df = pd.DataFrame.from_dict(aggreement, orient='index')
	df.columns = ["exact", "entropy","oneDisagree","divCount","divAns"]
	
	csvName=['vqaAbsResultW.csv','vqaAbsResultN.csv','vqaRealResultW.csv','vqaRealResultN.csv']
	df.to_csv(csvName[j])

# import result to pandas dataframe
inputFile = ["results/vqabox-abstract.txt","results/abstract-result-noRastionale.txt","results/vqabox-real-with-rationale.txt","results/real-result-noRationale.txt"]
for i in range(4):
	data = pd.read_csv(inputFile[i],sep="\t")
	resultToCsv(data,i)
	

