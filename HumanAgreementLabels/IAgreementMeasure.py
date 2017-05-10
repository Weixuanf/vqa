from AnswerTypeMgr import AnswerTypeMgr
class IAgreementMeasure:
    """ Interface class revealing all methods shared by feature extractors"""
    def __init__(self):
        self.answerTypeMgr = AnswerTypeMgr()
        self.algSuccessCounter = AnswerTypeMgr()

    def incrementAnswerTypeCount(self, answerType):
        self.answerTypeMgr.incrementCount(answerType)

    def incrementAlgSuccessCount(self, answerType):
        self.algSuccessCounter.incrementCount(answerType)

    def getAnswerTypeCounts(self):
        return self.answerTypeMgr

    def getAlgSuccessCount(self):
        return self.algSuccessCounter