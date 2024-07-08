
interface todolist {
	id:string;
	title:string;
	badge:string;
	color1:string;
	status:string;
	color2:string;
}
export const Todolistloopdata:todolist[]=[
	{id:"1", title:"Home page design", badge:"Heigh", color1:"danger", status:"Inprogress", color2:"pink"},
	{id:"2", title:"Testing", badge:"Low", color1:"warning", status:"pending", color2:"info"},
	{id:"3", title:"Creating Home Page Website", badge:"Medium", color1:"success", status:"Completed", color2:"success"},
	{id:"4", title:"Data table Design", badge:"Medium", color1:"success", status:"pending", color2:"info"},
	{id:"5", title:"Design Horizontal Layout", badge:"Medium", color1:"success", status:"Completed", color2:"success"},
	{id:"6", title:"Fix Header issue", badge:"Heigh", color1:"danger", status:"Inprogress", color2:"pink"},
	{id:"7", title:"Create a blog post", badge:"Heigh", color1:"danger", status:"Inprogress", color2:"pink"},
	{id:"8", title:"Testing", badge:"Low", color1:"warning", status:"pending", color2:"info"},
	{id:"9", title:"Fix the Data Table Issue", badge:"Medium", color1:"success", status:"Completed", color2:"success"},
	{id:"10", title:"Fix the Data Table Issue", badge:"Medium", color1:"success", status:"pending", color2:"info"},
	{id:"11", title:"Data table Design", badge:"Heigh", color1:"danger", status:"Inprogress", color2:"pink"},
	{id:"12", title:"Fix the Data Table Issue", badge:"Medium", color1:"success", status:"pending", color2:"info"},
];

interface todolist1 {
	id:string;
	title:string;
	badge:string;
	color1:string;
	status:string;
	color2:string;
}

export const Todolistpending:todolist1[]=[
	{id:"1", title:"Testing", badge:"Low", color1:"warning", status:"pending", color2:"info"},
	{id:"2", title:"Testing", badge:"Low", color1:"warning", status:"pending", color2:"info"},
	{id:"3", title:"Testing", badge:"Low", color1:"warning", status:"pending", color2:"info"}
];

interface todolist2 {
	id:string;
	title:string;
	badge:string;
	color1:string;
	status:string;
	color2:string;
}
export const Todolistinprogress:todolist2[]=[
	{id:"1", title:"Home page design", badge:"Heigh", color1:"danger", status:"Inprogress", color2:"pink"},
	{id:"2", title:"Fix Header issue", badge:"Heigh", color1:"danger", status:"Inprogress", color2:"pink"},
	{id:"3", title:"Data table Design", badge:"Heigh", color1:"danger", status:"Inprogress", color2:"pink"},
	{id:"4", title:"Fix the Data Table Issue", badge:"Medium", color1:"success", status:"Inprogress", color2:"pink"},
	{id:"5", title:"Design Authentication pages", badge:"Medium", color1:"success", status:"Inprogress", color2:"pink"}
];
interface todolist3 {
	id:string;
	title:string;
	badge:string;
	color1:string;
	status:string;
	color2:string;
	color3:string;
	badge1:string;
}
export const Todolistincompleted:todolist3[]=[
	{id:"1", title:"Home page design", badge:"Medium", color1:"success", status:"Completed", color2:"success", color3:"danger", badge1:"heigh"},
	{id:"2", title:"Fix Header issue", badge:"Medium", color1:"success", status:"Completed", color2:"success", color3:"danger", badge1:"heigh"},
	{id:"3", title:"Data table Design", badge:"Medium", color1:"success", status:"Completed", color2:"success", color3:"danger", badge1:"heigh"},
	{id:"4", title:"Fix the Data Table Issue", badge:"Medium", color1:"success", status:"Completed", color2:"success", color3:"success", badge1:"medium"},
	{id:"5", title:"Fix the Data Table Issue", badge:"Medium", color1:"success", status:"Completed", color2:"success", color3:"success", badge1:"medium"},
	{id:"6", title:"Design Authentication pages", badge:"Medium", color1:"success", status:"Completed", color2:"success", color3:"success", badge1:"medium"},
];

interface option {
	value:string;
	label:string;
}
export const Option1 :option[]= [
	{ value: "Angelina May", label: "Angelina May" },
	{ value: "Kiara advain", label: "Kiara advain" },
	{ value: "Hercules Jhon", label: "Hercules Jhon" },
	{ value: "Mayor Kim", label: "Mayor Kim" },
];
interface option2 {
	value:string;
	label:string;
}
export const Option2:option2[] = [
	{ value: "Select", label: "Select" },
	{ value: "Critical", label: "Critical" },
	{ value: "High", label: "High" },
	{ value: "Medium", label: "Medium" },
	{ value: "Low", label: "Low" }
];
