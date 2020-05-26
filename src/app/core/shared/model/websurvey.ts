export class Survey {
  Question: string;
  Answer: string;
  Score: number;
}

export class WebSurvey {
   Age: string;
   Name: string;
   Email: string;
   Phone: string;
   Note: string;
   Survey: Survey[];
}
