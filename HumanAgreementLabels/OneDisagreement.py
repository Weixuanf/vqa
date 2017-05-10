#from HumanAgreementLabels.IAgreementMeasure import IAgreementMeasure
from collections import Counter

#class OneDisagreement(IAgreementMeasure):
class OneDisagreement():

    """ Detects whether all answer strings match exactly"""

    def produceLabel(self, answerList):
        isHumanAgreement = 0
        uniqueAnswers = Counter(answerList).keys()
        if (len(uniqueAnswers) == 1):
            isHumanAgreement = 1
        elif (len(uniqueAnswers) == 2):
            answersFrequencies = Counter(answerList).values()
            if (4 in answersFrequencies):
                isHumanAgreement = 1

        return isHumanAgreement

    def getAgreementType(self):
        return "OneDisagreement"