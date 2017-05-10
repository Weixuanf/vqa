from HumanAgreementLabels.IAgreementMeasure import IAgreementMeasure
from collections import Counter

class UnimodalAgreement(IAgreementMeasure):
    """ Labels images based on whether there are two sets of 'popular' answers"""

    def produceLabel(self, answerList):
        isHumanAgreement = 0
        minNumVotes = 2
        maxPopularity = 9
        uniqueAnswers = Counter(answerList).keys()
        if (len(uniqueAnswers) > 1):
            answersFrequencies = Counter(answerList).values()
            numPopularAnswers = sum(i >= minNumVotes for i in answersFrequencies)
            noDominantAnswer = all(i < maxPopularity for i in answersFrequencies)
            if (numPopularAnswers == 1) and noDominantAnswer:
                isHumanAgreement = 1

        return isHumanAgreement

    def getAgreementType(self):
        return "Unimodal"