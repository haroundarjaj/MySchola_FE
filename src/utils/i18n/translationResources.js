import authTranslationConfig from "pages/authentication/translation/translationConfig"
import navTranslationConfig from "components/navigation/menu-items/translation/translationConfig";
import generalTranslationConfig from "./GeneralTranslation/translationConfig";

const tResources = [
    ...authTranslationConfig,
    ...navTranslationConfig,
    ...generalTranslationConfig
]

export default tResources;
