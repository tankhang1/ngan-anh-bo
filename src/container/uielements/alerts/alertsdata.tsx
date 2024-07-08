
//IMAGES
import faces3 from "../../../assets/images/faces/3.jpg";
import faces10 from "../../../assets/images/faces/10.jpg";
import faces11 from "../../../assets/images/faces/11.jpg";
import faces5 from "../../../assets/images/faces/5.jpg";
import faces14 from "../../../assets/images/faces/14.jpg";
import faces8 from "../../../assets/images/faces/8.jpg";
import faces13 from "../../../assets/images/faces/13.jpg";
import faces15 from "../../../assets/images/faces/15.jpg";

interface defaultalert {
    text: string;
    class: string;
}
export const Defaultalerts: defaultalert[] = [
    { text: " A simple primary alert—check it out!", class: "primary" },
    { text: " A simple secondary alert—check it out!", class: "secondary" },
    { text: " A simple success alert—check it out!", class: "success" },
    { text: " A simple danger alert—check it out!", class: "danger" },
    { text: " A simple warning alert—check it out!", class: "warning" },
    { text: " A simple info alert—check it out!", class: "info" },
    { text: " A simple light alert—check it out!", class: "light" },
    { text: " A simple dark alert—check it out!", class: "dark" },
];

interface linkalerts {
    text1: string;
    text2: string;
    text3: string;
    class: string;
}
export const Linkalerts: linkalerts[] = [
    { text1: "A simple primary alert with ", text2: "an example link ", text3: "Give it a click if you like", class: "primary" },
    { text1: "A simple secondary alert with", text2: "an example link ", text3: "Give it a click if you like", class: "secondary" },
    { text1: "A simple success alert with", text2: "an example link ", text3: "Give it a click if you like", class: "success" },
    { text1: "A simple danger alert with ", text2: "an example link ", text3: "Give it a click if you like", class: "danger" },
    { text1: "A simple warning alert with ", text2: "an example link ", text3: "Give it a click if you like", class: "warning" },
    { text1: "A simple info alert with", text2: "an example link ", text3: "Give it a click if you like", class: "info" },
    { text1: "A simple light alert with ", text2: "an example link ", text3: "Give it a click if you like", class: "light" },
    { text1: "A simple dark alert with", text2: "an example link ", text3: "Give it a click if you like", class: "dark" },

];

interface solidlaerts {
    id: number;
    text: string;
    class: string;
    color: string;
}
export const Solidalerts: solidlaerts[] = [
    { id: 1, text: "A simple solid primary alert-check it out! ", class: "solid-primary", color: "" },
    { id: 2, text: "A simple solid secondary alert-check it out!", class: "solid-secondary", color: "" },
    { id: 3, text: "A simple solid info alert-check it out!", class: "solid-info", color: "" },
    { id: 4, text: "A simple solid warning alert-check it out! ", class: "solid-warning", color: "" },
    { id: 5, text: "A simple solid success alert-check it out!", class: "solid-success", color: "" },
    { id: 6, text: "A simple solid danger alert-check it out! ", class: "solid-danger", color: "" },
    { id: 7, text: "A simple solid light alert-check it out! ", class: "solid-light", color: "text-default" },
    { id: 8, text: "A simple solid dark alert-check it out!", class: "solid-dark", color: "text-white" },

];

interface outlinealert {
    id: number;
    text: string;
    class: string;
    color: string;
}
export const Outlinealerts: outlinealert[] = [
    { id: 1, text: "A simple outline primary alert-check it out! ", class: "outline-primary", color: "" },
    { id: 2, text: "A simple outline secondary alert-check it out!", class: "outline-secondary", color: "" },
    { id: 3, text: "A simple outline info alert-check it out!", class: "outline-info", color: "" },
    { id: 4, text: "A simple outline warning alert-check it out! ", class: "outline-warning", color: "" },
    { id: 5, text: "A simple outline success alert-check it out!", class: "outline-success", color: "" },
    { id: 6, text: "A simple outline danger alert-check it out! ", class: "outline-danger", color: "" },
    { id: 7, text: "A simple outline light alert-check it out! ", class: "outline-light", color: "text-default" },
    { id: 8, text: "A simple outline dark alert-check it out!", class: "outline-dark", color: "" },

];

interface rounded {
    id: number;
    text: string;
    class: string;
}
export const Roundedsolidalerts: rounded[] = [
    { id: 1, text: "A simple solid rounded primary alert—check it out! ", class: "solid-primary" },
    { id: 2, text: "A simple solid rounded secondary alert—check it out! ", class: "solid-secondary" },
    { id: 3, text: "A simple solid rounded warning alert—check it out! ", class: "solid-warning" },
    { id: 4, text: "A simple solid rounded danger alert—check it out!", class: "solid-danger" }
];

interface roundedoutline {
    id: number;
    text: string;
    class: string;
}
export const Roundedoutlinealerts: roundedoutline[] = [
    { id: 1, text: "A simple outline rounded primary alert—check it out! ", class: "outline-primary" },
    { id: 2, text: "A simple outline rounded secondary alert—check it out! ", class: "outline-secondary" },
    { id: 3, text: "A simple outline rounded warning alert—check it out! ", class: "outline-warning" },
    { id: 4, text: "A simple outline rounded danger alert—check it out!", class: "outline-danger" }
];

interface shadowalert {
    id: number;
    text: string;
    class: string;
    size: string;
}
export const Shadowsolidalerts: shadowalert[] = [
    { id: 1, text: "A simple solid primary alert with small shadow—check it out! ", class: "solid-primary", size: "sm" },
    { id: 2, text: "A simple solid primary alert with normal shadow—check it out! ", class: "solid-primary", size: "" },
    { id: 3, text: "A simple solid primary alert with large shadow—check it out! ", class: "solid-primary", size: "lg" },
    { id: 4, text: "A simple solid secondary alert with small shadow—check it out!", class: "solid-secondary", size: "sm" },
    { id: 5, text: "A simple solid secondary alert with normal shadow—check it out!", class: "solid-secondary", size: "" },
    { id: 6, text: "A simple solid secondary alert with large shadow—check it out!", class: "solid-secondary", size: "lg" },

];
interface defaultsolidalert {
    text: string;
    class: string;
    size: string;
}
export const Defaultsolidalerts: defaultsolidalert[] = [
    { text: "A simple solid primary alert with small shadow—check it out! ", class: "primary", size: "sm" },
    { text: "A simple solid primary alert with normal shadow—check it out! ", class: "primary", size: "" },
    { text: "A simple solid primary alert with large shadow—check it out! ", class: "primary", size: "lg" },
    { text: "A simple solid secondary alert with small shadow—check it out!", class: "secondary", size: "sm" },
    { text: "A simple solid secondary alert with normal shadow—check it out!", class: "secondary", size: "" },
    { text: "A simple solid secondary alert with large shadow—check it out!", class: "secondary", size: "lg" },
];

interface roundeddefaultalert {
    id: number;
    text: string;
    class: string;
}
export const Roundedefaultalerts: roundeddefaultalert[] = [
    { id: 1, text: "A simple rounded primary alert—check it out! ", class: "primary" },
    { id: 2, text: "A simple rounded secondary alert—check it out! ", class: "info" },
    { id: 3, text: "A simple rounded warning alert—check it out! ", class: "warning" },
    { id: 4, text: "A simple rounded danger alert—check it out!", class: "danger" }
];

interface roundedbtn {
    id: number;
    text: string;
    class: string;
}
export const Roundewithbtnalerts: roundedbtn[] = [
    { id: 1, text: "A simple rounded primary alert—check it out! ", class: "primary" },
    { id: 2, text: "A simple rounded secondary alert—check it out! ", class: "info" },
    { id: 3, text: "A simple rounded warning alert—check it out! ", class: "warning" },
    { id: 4, text: "A simple rounded danger alert—check it out!", class: "danger" }
];

interface customized1alert {
    id: number;
    class1: string;
    color: string;
}
export const Customizedalert1: customized1alert[] = [
    { id: 1, class1: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z", color: "primary" },
    { id: 2, class1: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z", color: "secondary", },
    { id: 3, class1: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z", color: "warning", },
    { id: 4, class1: "M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z", color: "danger", },
];
interface imagealert {
    id: number;
    src1: string;
    color: string;
    class: string;
}
export const Imagealerts: imagealert[] = [
    { id: 1, src1: faces3, color: "primary", class: "" },
    { id: 2, src1: faces5, color: "secondary", class: "" },
    { id: 3, src1: faces8, color: "warning", class: "" },
    { id: 4, src1: faces11, color: "danger", class: "" },
    { id: 5, src1: faces13, color: "info", class: "" },
    { id: 6, src1: faces10, color: "light", class: "" },
    { id: 7, src1: faces15, color: "dark", class: "text-muted" },
];

interface avatarsize {
    id: number;
    src1: string;
    color: string;
    class: string;
    class1: string;
}
export const avatarsizealert: avatarsize[] = [
    { id: 1, src1: faces3, color: "primary", class: "xs", class1: "" },
    { id: 2, src1: faces5, color: "secondary", class: "sm", class1: "" },
    { id: 3, src1: faces8, color: "warning", class: "", class1: "" },
    { id: 4, src1: faces11, color: "danger", class: "md", class1: "" },
    { id: 5, src1: faces13, color: "info", class: "lg", class1: "" },
    { id: 6, src1: faces14, color: "dark", class: "xl", class1: "text-muted" },
];

interface svgalert {
    id: number;
    class1: string;
    text1: string;
    text2: string;
    color: string;
    btn1: string;
    btn2: string;
    class: string;
}
export const Svgalert1: svgalert[] = [
    { id: 1, class1: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z", text1: "Information Alert", text2: "Information alert to show to information", color: "primary", btn1: "cancel", btn2: "open", class: "" },
    { id: 2, class1: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z", text1: "Success Alert", text2: "Success alert to show to success message", color: "secondary", btn1: "", btn2: "close", class: "" },
    { id: 3, class1: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z", text1: "Warning Alert", text2: "Warning alert to show warning message", color: "warning", btn1: "skip", btn2: "open", class: "" },
    { id: 4, class1: "M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z", text1: "Danger Alert", text2: "Danger alert to show the danger message", color: "danger", btn1: "close", btn2: "continue", class: "" },
];

interface svgalert1 {
    id: number;
    class1: string;
    text1: string;
    text2: string;
    color: string;
    btn1: string;
    btn2: string;
    class: string;
}
export const Svgalert: svgalert1[] = [
    { id: 1, class1: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z", text1: "Information Alert", text2: "Information alert to show to information", color: "primary", btn1: "cancel", btn2: "open", class: "secondary" },
    { id: 2, class1: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z", text1: "Success Alert", text2: "Success alert to show to success message", color: "secondary", btn1: "cancel", btn2: "open", class: "danger" },
    { id: 3, class1: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z", text1: "Warning Alert", text2: "Warning alert to show warning message", color: "warning", btn1: "cancel", btn2: "open", class: "dark" },
    { id: 4, class1: "M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z", text1: "Danger Alert", text2: "Danger alert to show the danger message", color: "danger", btn1: "cancel", btn2: "open", class: "info" },
];

interface additionalalert {
    id: number;
    text1: string;
    text2: string;
    text3: string;
    class: string;
}
export const Additionalcontentalerts: additionalalert[] = [
    { id: 1, text1: "Thank you for reporting this.", text2: "We appreciate you to let us know the bug in the template and for warning us about future consequences ", text3: "Visit for support for queries ?", class: "primary" },
    { id: 2, text1: "Thank you for reporting this.", text2: "We appreciate you to let us know the bug in the template and for warning us about future consequences ", text3: "Visit for support for queries ?", class: "secondary" },
    { id: 3, text1: "Thank you for reporting this.", text2: "We appreciate you to let us know the bug in the template and for warning us about future consequences ", text3: "Visit for support for queries ?", class: "success" },
    { id: 4, text1: "Thank you for reporting this.", text2: "We appreciate you to let us know the bug in the template and for warning us about future consequences ", text3: "Visit for support for queries ?", class: "warning" }
];
