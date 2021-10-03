import { SortOption } from '@/store/types';
import { i18n } from '@/i18n';

export const sortingOptions: SortOption[] = [
    {
        name: i18n.global.t('recipe.name'),
        id: 'name',
        order: 'ASC'
    },
    {
        name: i18n.global.t('recipe.rating'),
        id: 'rating',
        order: 'ASC'
    },
    {
        name: i18n.global.t('recipe.lastUsed'),
        id: 'lastUsed',
        order: 'ASC'
    },
    {
        name: i18n.global.t('recipe.creationDate'),
        id: 'creationDate',
        order: 'ASC'
    },
]