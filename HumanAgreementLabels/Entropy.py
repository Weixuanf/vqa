#from HumanAgreementLabels.IAgreementMeasure import IAgreementMeasure
from collections import Counter
import scipy.stats as stats

# class Entropy(IAgreementMeasure):
class Entropy():
    """ Computes the entropy for the 5 answers"""

    def __init__(self):
        allAgree = ['a', 'a', 'a', 'a', 'a']
        allDisagree = ['a', 'b', 'c', 'd', 'e',]
        self.minEntropyValue = stats.entropy(self.createFreqDistribution(allAgree))
        self.maxEntropyValue = stats.entropy(self.createFreqDistribution(allDisagree))

    def produceLabel(self, answerList):
        entropy = stats.entropy(self.createFreqDistribution(answerList))
        normalizedEntropy = (entropy-self.minEntropyValue)/(self.maxEntropyValue-self.minEntropyValue)

        return normalizedEntropy

    def createFreqDistribution(self, answerList):
        uniqueAnswers = Counter(answerList).keys()
        answersFrequencies = Counter(answerList).values()
        frequencyVector = []
        numSamples = 5
        for count in answersFrequencies:
            frequency = float(count/numSamples)
            frequencyVector.append(frequency)

        numZeros = numSamples - len(answersFrequencies)
        for i in range(numZeros):
            frequencyVector.append(0)

        return frequencyVector

    def getAgreementType(self):
        return "Entropy"