
interface singlebutton {
	id:number;
	class:string;
}
export const SingleButtons:singlebutton[] = [
	{ id: 1, class: "primary" },
	{ id: 2, class: "secondary" },
	{ id: 3, class: "success" },
	{ id: 4, class: "info" },
	{ id: 5, class: "warning" },
	{ id: 6, class: "danger" }
];

interface outlinebutton {
	id:number;
	class:string;
}
export const OutlineButtons:outlinebutton[] = [
	{ id: 1, class: "outline-primary" },
	{ id: 2, class: "outline-secondary" },
	{ id: 3, class: "outline-success" },
	{ id: 4, class: "outline-info" },
	{ id: 5, class: "outline-warning" },
	{ id: 6, class: "outline-danger" }
];

interface splitbuttons {
	id:number;
	class:string;
}
export const SplitButtonsdata:splitbuttons[] = [
	{ id: 1, class: "primary" },
	{ id: 2, class: "secondary" },
	{ id: 3, class: "info" },
	{ id: 4, class: "success" },
	{ id: 5, class: "warning" },
	{ id: 6, class: "danger" }
];

interface sizingbuttons {
	id:number;
	class:string;
	size:string;
	text1:string;
	text2:string;
}
export const SizingButtons:sizingbuttons[] = [
	{ id: 1, class: "primary", size: "lg", text1: "Large button", text2: "Large split button" },
	{ id: 2, class: "primary", size: "sm", text1: "Small  button", text2: "Small split button" },
];

interface autoclose {
	id:number;
	class:string;
	text:string;
}
export const AutocloseButtons:autoclose[] = [
	{ id: 1, class: "primary", text: "Default dropdown" },
	{ id: 2, class: "secondary", text: "Clickable  outside" },
	{ id: 3, class: "info", text: "Clickable  inside" },
	{ id: 4, class: "warning", text: "Manual  close" },
];

interface custombuttons {
	id:number;
	class:string;
	text:string;
	class1:string;
	class2:string;
}
export const CustomButtons:custombuttons[] = [
	{ id: 1, class: "primary", text: "Primary", class1: "menu-primary", class2: "" },
	{ id: 2, class: "secondary", text: "Secondary", class1: "menu-secondary", class2: "" },
	{ id: 3, class: "warning", text: "warning", class2: "item-warning", class1: "" },
	{ id: 4, class: "info", text: "info", class2: "item-info", class1: "" },
	{ id: 5, class: "success", text: "success", class2: "light-success", class1: "" },
	{ id: 6, class: "danger", text: "danger", class2: "light-danger", class1: "" }
];
interface ghost {
	id:number;
	class:string;
	text:string;
}
export const GhostButtons:ghost[] = [
	{ id: 1, class: "primary-ghost", text: "Primary" },
	{ id: 2, class: "secondary-ghost", text: "Secondary" },
	{ id: 3, class: "warning-ghost", text: "warning" },
	{ id: 4, class: "info-ghost", text: "info" },
	{ id: 5, class: "success-ghost", text: "success" },
	{ id: 6, class: "danger-ghost", text: "danger" }
];

interface alignments {
	id:number;
	class:string;
	text:string;
	dir:string;
}
export const AlignmentButtons:alignments[] = [
	{ id: 1, class: "primary", text: "Dropdown", dir: "" },
	{ id: 2, class: "secondary", text: "Right-aligned menu", dir: "" },
	{ id: 3, class: "info", text: "Left-aligned, right-aligned lg", dir: "" },
	{ id: 4, class: "warning", text: "Right-aligned, left-aligned lg", dir: "" },
	{ id: 5, class: "success", text: "Dropstart", dir: "start" },
	{ id: 6, class: "danger", text: "Dropend", dir: "end" },
	{ id: 7, class: "teal", text: "Dropup", dir: "up" }
];

