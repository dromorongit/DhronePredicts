// React module augmentation
declare module 'react' {
  export function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prevState: T) => T)) => void]
  export function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void
  export function useRouter(): any
  export type ReactNode = any
  
  export interface ChangeEvent<T = Element> {
    target: T
  }
  
  export interface FormEvent<T = Element> {
    target: T
    preventDefault: () => void
  }
}

declare module 'next-auth/react' {
  export function useSession(): any
  export function SessionProvider(props: { children?: any; session?: any }): any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function signIn(provider?: string, options?: any): any
  export function signOut(): any
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}

// Make types available globally
type ChangeEvent<T = Element> = {
  target: T
}

type FormEvent<T = Element> = {
  target: T
  preventDefault: () => void
}