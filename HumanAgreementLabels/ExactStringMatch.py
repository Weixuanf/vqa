#from HumanAgreementLabels.IAgreementMeasure import IAgreementMeasure
from collections import Counter

#class ExactStringMatch(IAgreementMeasure):
class ExactStringMatch():

    """ Detects whether all answer strings match exactly"""

    def produceLabel(self, answerList):
        isHumanAgreement = 0
        uniqueAnswers = Counter(answerList).keys()
        if (len(uniqueAnswers) == 1):
            isHumanAgreement = 1

        return isHumanAgreement

    def getAgreementType(self):
        return "ExactString"