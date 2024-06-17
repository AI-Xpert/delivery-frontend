export interface ITransmissionResponse {
  success: boolean;
  message: string;
  data?: { [index: string]: any };
}
