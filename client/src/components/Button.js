import React, { useState } from "react";
import theme from "../theme";
import { css } from "@emotion/css";

export default function Button(props) {
  return (
		<button
			className={css`
				${props.style};
			`}
			type="button"
			onClick={(e) => props.onClick(e)}
		>
			{props.loading ? "Loading..." : props.title}
		</button>
	);
}
