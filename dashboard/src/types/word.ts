export default interface Word {
  word: string;                       // obligatoire
  class?: number;                      // optionnel
  definition?: string;                 
  translated_definition?: string;     
  level?: string;                      
  categories?: number[];               
  source?: number;                     
  phonetic?: string;                   
  vocal_url?: typeof entities_schemas.fileUrl; 
  updates?: typeof entities_schemas.updates;   
  createdAt?: typeof entities_schemas.createdAtSchema;
  translated_word?: String
}
