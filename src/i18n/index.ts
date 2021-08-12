import { createI18n } from 'vue-i18n'
import en from './en.locale'
import datetimeFormats from './dateFormats'

const messages = {
    en
}

export const i18n = createI18n({
    locale: 'en',
    messages,
    datetimeFormats
})