package TBL2Fase3;

public class TBL2Fase3 {
	
	private double 	tempo,
					aplicacaoInicial,
					taxa,
					rendimentoBruto,
					impostoRenda;

	public TBL2Fase3(double tempo, double aplicacaoInicial, double taxa) {
		this.tempo = tempo / 365.0f;
		this.aplicacaoInicial = aplicacaoInicial;
		this.taxa = taxa / 100;
		this.rendimentoBruto = calculaRendimentoBruto();
	}

	private double calculaRendimentoBruto() {
		return this.aplicacaoInicial * this.taxa * this.tempo;
	}

	public double getRendimentoBruto() {
		return this.rendimentoBruto;
	}

	public double getImpostoRenda() {
		// TODO Auto-generated method stub
		return 3.14f;
	}

}
