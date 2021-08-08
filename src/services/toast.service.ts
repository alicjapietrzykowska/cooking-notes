import { useToast } from 'primevue/usetoast';
import { ToastServiceMethods } from 'primevue/toastservice';
import { ComponentPublicInstance, Ref } from 'vue';

export interface ToastConfiguration {
    severity: 'success' | 'info' | 'warn' | 'error',
    summary: string,
    detail: string,
    life: number,
    closable: boolean
}

let toasts: ToastServiceMethods
let toaster: Ref<ComponentPublicInstance | null | undefined>

const DEFAULT_DURATION = 2500

const DEFAULT_CONFIG: Partial<ToastConfiguration> = {
    severity: 'success',
    life: DEFAULT_DURATION,
    closable: true
}

export const init = (toasterRef: typeof toaster) => {
    toasts = useToast()
    toaster = toasterRef
}

export const showToast = (configuration: Partial<ToastConfiguration>) => {
    const toastConfig = {...DEFAULT_CONFIG, ...configuration}
    toasts.add(toastConfig)

}