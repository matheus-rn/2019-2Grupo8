package TBL2Fase3;

public class TBL2Fase3 {
	
	private double 	tempo,
					aplicacaoInicial,
					taxa,
					rendimentoBruto,
					taxaImpostoRenda,
					impostoRenda;

	public TBL2Fase3(double tempo, double aplicacaoInicial, double taxa) {
		this.tempo = tempo / 365.0f;
		this.aplicacaoInicial = aplicacaoInicial;
		this.taxa = taxa / 100;
		
		this.rendimentoBruto = calculaRendimentoBruto();
		this.taxaImpostoRenda = calculaAliquota(tempo);
		this.impostoRenda = calculaImpostoRenda();
	}

	private double calculaRendimentoBruto() {
		return this.aplicacaoInicial * this.taxa * this.tempo;
	}

	public double getRendimentoBruto() {
		return this.rendimentoBruto;
	}
	
	private double calculaAliquota(double tempo) {
		if (tempo <= 180) {
			return 0.225;
		} else if (tempo <= 360 ) {
			return 0.2; 
		} else if (tempo <= 720) {
			return 0.175;
		} else {
			return 0.15;
		}
	}

	private double calculaImpostoRenda() {
		return this.rendimentoBruto * this.taxaImpostoRenda;
	}

	public double getImpostoRenda() {
		return this.impostoRenda;
	}

	public double getTaxaRendimentoLiquido() {
		// TODO Auto-generated method stub
		return 1.0829;
	}

}
