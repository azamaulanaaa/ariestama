import {
    ReactNode,
    useState,
    createContext,
    useContext,
    useEffect,
} from 'react';

import * as Default from './default';
import * as Dashboard from './dashboard';

const LayoutContext = createContext<(layout: Layout) => void>(() => {});

type Layout = (props: { children: ReactNode }) => JSX.Element;

export type LayoutProviderProps = { children: ReactNode };

export const LayoutProvider = (props: LayoutProviderProps) => {
    const [Layout, setLayout] = useState<Layout>(() => Default.default);

    return (
        <LayoutContext.Provider value={(layout) => setLayout(() => layout)}>
            <Layout>{props.children}</Layout>
        </LayoutContext.Provider>
    );
};

const useLayout = () => {
    const setLayout = useContext(LayoutContext);

    const layoutList = {
        default() {
            useEffect(() => setLayout(Default.default), []);
            return Default.config;
        },
        dashboard() {
            useEffect(() => setLayout(Dashboard.default), []);
            return Dashboard.config;
        },
    };

    return layoutList;
};

export default useLayout;
