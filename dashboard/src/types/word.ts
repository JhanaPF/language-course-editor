export default interface Word {
  _id: string;
  word: string;
  class?: number;
  definition?: string;
  translated_definition?: string;
  level?: string;
  categories?: number[];
  source?: string;
  phonetic?: string;
  vocal_url?: string;
  updates?: string;
  createdAt?: string;
  translated_word?: string;
  value?: string;
  additionalData: any;
}