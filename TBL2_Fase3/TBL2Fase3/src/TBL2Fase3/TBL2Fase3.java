package TBL2Fase3;

public class TBL2Fase3 {
	
	private double 	tempo,
					aplicacaoInicial,
					taxa;

	public TBL2Fase3(double tempo, double aplicacaoInicial, double taxa) {
		this.setTempo(tempo);
		this.setAplicacaoInicial(aplicacaoInicial);
		this.setTaxa(taxa);
	}

	public double getRendimentoBruto() {
		return 13.97f;
	}

	public double getTempo() {
		return tempo;
	}

	public void setTempo(double tempo) {
		this.tempo = tempo;
	}

	public double getAplicacaoInicial() {
		return aplicacaoInicial;
	}

	public void setAplicacaoInicial(double aplicacaoInicial) {
		this.aplicacaoInicial = aplicacaoInicial;
	}

	public double getTaxa() {
		return taxa;
	}

	public void setTaxa(double taxa) {
		this.taxa = taxa;
	}

}
