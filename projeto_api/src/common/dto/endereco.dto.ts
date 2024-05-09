export class EnderecoDto {
  cep?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  latlong?: {
    type: string;
    coordinates: number[];
  };
}
