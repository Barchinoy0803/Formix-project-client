import { useTranslation } from 'react-i18next';

export function useTranslator(keyPrefix?: string) {
    return useTranslation('translation', {keyPrefix})
}
