interface selectoption1 {
    value:string;
    label:string;
}
export const Selectoption1:selectoption1[] = [
	{ value: "Selection-1", label: "Selection-1" },
	{ value: "Selection-2", label: "Selection-2" },
	{ value: "Selection-3", label: "Selection-3" },
	{ value: "Selection-4", label: "Selection-4" },
	{ value: "Selection-5", label: "Selection-5" }
];

interface selectoption2 {
    value:string;
    label:string;
}
export const Selectoption2:selectoption2[] = [
	{ value: "Multiple-1", label: "Multiple-1" },
	{ value: "Multiple-2", label: "Multiple-2" },
	{ value: "Multiple-3", label: "Multiple-3" },
	{ value: "Multiple-4", label: "Multiple-4" },
	{ value: "Multiple-5", label: "Multiple-5" }
];

interface selectoption3 {
    value:string;
    label:string;
}
export const Selectoption3:selectoption3[] = [
	{ value: "Texas", label: "Texas" },
	{ value: "Georgia", label: "Georgia" },
	{ value: "California", label: "California" },
	{ value: "Washington D.C", label: "Washington D.C" },
	{ value: "Virginia", label: "Virginia" }
];
  
interface selectoption4 {
    value:string;
    label:string;
}
export const Selectoption4:selectoption4[] = [
	{ value: "Appple", label: "Appple" },
	{ value: "Mango", label: "Mango" },
	{ value: "Orange", label: "Orange" },
	{ value: "Guava", label: "Guava" },
	{ value: "Pineapple", label: "Pineapple" }
];
  
interface selectoption5 {
    value:string;
    label:string;
}
export const Selectmaxoption:selectoption5[]= [
	{ value: "Andrew", label: "Andrew" },
	{ value: "Maya", label: "Maya" },
	{ value: "Brodus Axel", label: "Brodus Axel" },
	{ value: "Goldhens", label: "Goldhens" },
	{ value: "Angelina", label: "Angelina" }
];
  
//IMAGES 
import faces1 from "../../../assets/images/faces/1.jpg";
import faces2 from "../../../assets/images/faces/2.jpg";
import faces3 from "../../../assets/images/faces/3.jpg";
import faces4 from "../../../assets/images/faces/4.jpg";
import faces5 from "../../../assets/images/faces/5.jpg";

export const Selectoption5= [
	{
		value: "Andrew", label: (
			<div>
				<img src={faces1} alt="Option 1" className="me-2 me-2" />
          Andrew
			</div>
		)
	},
	{
		value: "Maya", label: (
			<div>
				<img src={faces2} alt="Option 1" className="me-2" />
          Maya
			</div>
		)
	},
	{
		value: "Brodus Axel", label: (
			<div>
				<img src={faces3} alt="Option 1" className="me-2" />
          Brodus Axel
			</div>
		)
	},
	{
		value: "Goldhens", label: (
			<div>
				<img src={faces4} alt="Option 1" className="me-2" />
          Goldhens
			</div>
		)
	},
	{
		value: "Angelina", label: (
			<div>
				<img src={faces5} alt="Option 1" className="me-2" />
          Angelina
			</div>
		)
	}
];
