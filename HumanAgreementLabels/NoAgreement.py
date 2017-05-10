from HumanAgreementLabels.IAgreementMeasure import IAgreementMeasure
from collections import Counter

class NoAgreement(IAgreementMeasure):
    """ Detects whether all answer strings match exactly"""

    def produceLabel(self, answerList):
        isHumanAgreement = 0
        uniqueAnswers = Counter(answerList).keys()
        if (len(uniqueAnswers) == 10):
            isHumanAgreement = 1
        #if (isHumanDisagreement):  # FOR DEBUGGING
        #    print(imgText + 'Humans Disagree!')

        return isHumanAgreement

    def getAgreementType(self):
        return "NoAgreement"
