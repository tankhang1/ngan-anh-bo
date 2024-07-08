interface mailsetting {
	id:number;
	class:string;
	text1:string;
	text2:string;
}
export const Mailsettingslist:mailsetting[] =[
	{id:1, class:"bi bi-phone me-2 fs-16 align-middle text-muted", text1:"Mobile-LG-1023", text2:"Manchester, UK-Nov 30, 04:45PM"},
	{id:2, class:"bi bi-laptop me-2 fs-16 align-middle text-muted", text1:"Lenovo-1291203", text2:"England, UK-Aug 12, 12:25PM"},
	{id:3, class:"bi bi-laptop me-2 fs-16 align-middle text-muted", text1:"Macbook-Suzika", text2:"Brightoon, UK-Jul 18, 8:34AM"},
	{id:4, class:"bi bi-pc-display-horizontal me-2 fs-16 align-middle text-muted", text1:"Apple-Desktop", text2:"Darlington, UK-Jan 14, 11:14AM"}
];

interface language {
	value:string;
	label:string;
}
//selectdata
export const Languageoptions:language[]=[
	{value:"English", label:"English"},
	{value:"French", label:"French"},
	{value:"Arabic", label:"Arabic"},
	{value:"Hindi", label:"Hindi"},
  
];

interface maxmail {
	value:string;
	label:string;
}
//selectdata
export const maxmails:maxmail[]=[
	{value:"10", label:"10"},
	{value:"50", label:"50"},
	{value:"100", label:"100"},
	{value:"120", label:"120"},
  
];

interface country {
	value:string;
	label:string;
}
export const Countryoptions:country[]=[
	{value:"Usa", label:"Usa"},
	{value:"Australia", label:"Australia"},
	{value:"Dubai", label:"Dubai"},
  
];

interface maximum {
	value:string;
	label:string;
}
export const Maximumoptions:maximum[]=[
	{value:"10", label:"10"},
	{value:"50", label:"50"},
	{value:"100", label:"100"},
	{value:"200", label:"200"},
  
];
interface maximum1 {
	value:string;
	label:string;
}
export const MaxLimitoptions:maximum1[]=[
	{value:"3 Attempts", label:"3 Attempts"},
	{value:"5 Attempts", label:"5 Attempts"},
	{value:"10 Attempts", label:"10 Attempts"},
	{value:"20 Attempts", label:"20 Attempts"},
  
];
interface maximum2 {
	value:string;
	label:string;
}
export const Accountoptions:maximum2[]=[
	{value:"1 Day", label:"1 Day"},
	{value:"1 Hour", label:"1 Hour"},
	{value:"1 Month", label:"1 Month"},
	{value:"1 Year", label:"1 Year"},
  
];
