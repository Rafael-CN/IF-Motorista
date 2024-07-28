import api from "@/services/api";
import Router from "next/router";

export default function Cadastro() {
	const handleSubmit = (e) => {
		e.preventDefault();

		const { cpf, nome, numRegistro, telefone } = e.target;
		const motorista = {
			cpf: cpf.value,
			nome: nome.value,
			numRegistro: numRegistro.value,
			telefone: telefone.value,
		};

		api
			.post("/motoristas/", motorista)
			.then((r) => {
				alert("Motorista salvo com sucesso!");
				Router.push("/motorista/listagem");
			})
			.catch((e) => {
				alert("Erro ao salvar o motorista!");
				alert(e?.response?.data?.message ?? e.message);
			});
	};

	return (
		<>
			<h3>Cadastro de motoristas</h3>
			<form onSubmit={handleSubmit}>
				<p>
					<label htmlFor="cpf">CPF: </label>
					<input type="text" id="cpf" name="cpf" required />
				</p>
				<p>
					<label htmlFor="nome">Nome: </label>
					<input type="text" id="nome" name="nome" required />
				</p>
				<p>
					<label htmlFor="numRegistro">Número de registro: </label>
					<input type="text" id="numRegistro" name="numRegistro" required />
				</p>
				<p>
					<label htmlFor="telefone">Telefone: </label>
					<input type="text" id="telefone" name="telefone" />
				</p>

				<button type="submit">Salvar</button>
			</form>
		</>
	);
}
