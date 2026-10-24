export type Category={id:number;name:string;slug:string;description:string;game_count?:number};
export type Game={id:number;title:string;slug:string;description:string;category_id:number;category:string;category_slug:string;thumbnail?:string;game_source:string;game_type:'snake'|'memory'|'tictactoe'|'external'|'embed';is_featured:number;is_published:number;plays:number;created_at:string};
