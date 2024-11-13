import authTranslationConfig from "pages/authentication/translation/translationConfig"
import navTranslationConfig from "components/navigation/menu-items/translation/translationConfig";
import generalTranslationConfig from "./GeneralTranslation/translationConfig";
import administrationTranslationConfig from "pages/administration/translation/translationConfig";
import tableTranslationConfig from "components/ui-component/GeneralTable/translation/translationConfig"

const tResources = [
    ...authTranslationConfig,
    ...navTranslationConfig,
    ...generalTranslationConfig,
    ...administrationTranslationConfig,
    ...tableTranslationConfig
]

export default tResources;
