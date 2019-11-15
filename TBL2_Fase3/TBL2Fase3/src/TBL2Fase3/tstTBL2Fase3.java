package TBL2Fase3;

import java.util.Arrays;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

@RunWith(Parameterized.class)
public class tstTBL2Fase3 {

	private double 	tempo,
					aplicacaoInicial,
					taxa;
	
	private RespostaEsperada respostaEsperada;

	public tstTBL2Fase3 (double t, double p, double i, RespostaEsperada r) {
		this.tempo = t;
		this.aplicacaoInicial = p;
		this.taxa = i;
		this.respostaEsperada = r;
	}
	
	@Parameters
	public static Iterable<Object[]> getParameters() {
		Object[][] resposta = new Object[][] {
			{60.0f, 1000.0f, 8.5, new RespostaEsperada (
					13.97f, 3.14f, 1.0829
					)},
			{240.0f, 3000.0f, 9.0f, new RespostaEsperada (
					177.53f, 35.51f, 4.7342
					)},
			{390.0f, 100.0f, 7.5f, new RespostaEsperada (
					8.01f, 1.40f, 6.6113
					)},
			{900.0f, 4200.0f, 9.5f, new RespostaEsperada (
					983.84f, 147.58f, 19.9110
					)}
		};
		
		return Arrays.asList(resposta);
	}
	
	@Test
	public void test() {
		TBL2Fase3 calculo = new TBL2Fase3(tempo, aplicacaoInicial, taxa);
		
		assert(Math.abs(respostaEsperada.rendimentoBruto - calculo.getRendimentoBruto()) < 0.01);
		assert(Math.abs(respostaEsperada.impostoRenda - calculo.getImpostoRenda()) < 0.01);
	}

}
