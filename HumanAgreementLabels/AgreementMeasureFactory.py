import sys
from HumanAgreementLabels.ExactStringMatch import ExactStringMatch
# from HumanAgreementLabels.NotExactStringMatch import NotExactStringMatch
# from HumanAgreementLabels.OneDisagreement import OneDisagreement
# #from HumanAgreementLabels.BimodalAgreement import BiomodalAgreement
# from HumanAgreementLabels.UnimodalAgreement import UnimodalAgreement
# from HumanAgreementLabels.NoAgreement import NoAgreement
# from HumanAgreementLabels.Entropy import Entropy

class AgreementMeasureFactory:


    def createAgreementMeasure(measureType):
        if (measureType == "ExactString"):
            return ExactStringMatch()
        # elif (measureType == "NotExactString"):
        #     return NotExactStringMatch()
        # elif (measureType == "OneDisagreement"):
        #     return OneDisagreement()
        # #elif (measureType == "Bimodal"):
        #     #return BiomodalAgreement()
        # elif (measureType == "Unimodal"):
        #     return UnimodalAgreement()
        # elif (measureType == "NoAgreement"):
        #     return NoAgreement()
        # elif (measureType == "Entropy"):
        #     return Entropy()
        else:
            print("Failed to create measure: %s" %(measureType))
            sys.exit()