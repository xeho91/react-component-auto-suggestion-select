import type { GlobalProvider } from "@ladle/react";
import { domAnimation, LazyMotion } from "framer-motion";

import "$styles/global.scss";

// eslint-disable-next-line react/prop-types
export const Provider: GlobalProvider = ({ children }) => (
	<LazyMotion features={domAnimation} strict>
		{children}
	</LazyMotion>
);
