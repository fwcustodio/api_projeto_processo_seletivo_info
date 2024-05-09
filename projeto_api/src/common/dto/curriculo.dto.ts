export class CertificadoDto {
  nome?: string;
  empresa_nome?: string;
  data_emissao?: string;
}

export class ExperienciaDto {
  titulo?: string;
  tipo?: string;
  empresa_nome?: string;
  local?: string;
  data_inicio?: Date;
  data_fim?: Date;
}

export class ServicoDto {
  nome?: string;
  descricao?: string;
  categoria_id?: string;
}

export class CartaRecomendacaoDto {
  nome?: string;
  emissor?: string;
  documento_url?: string;
}