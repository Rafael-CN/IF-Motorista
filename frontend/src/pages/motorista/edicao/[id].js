import api from "@/services/api";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function Edicao() {
	const [id, setId] = useState(0);
	const [motorista, setMotorista] = useState({});

	const getMotorista = (id) => {
		api
			.get(`/motoristas/${id}`)
			.then((r) => {
				setMotorista(r.data);
			})
			.catch((e) => {
				alert("Erro ao recuperar dados do motorista");
			});
	};

	useEffect(() => {
		const _id = Number(Router.query.id);
		if (!isNaN(_id)) {
			getMotorista(_id);
			setId(_id);
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		const { cpf, nome, numRegistro, telefone } = e.target;
		const motoristaSalvar = {
			cpf: cpf.value,
			nome: nome.value,
			numRegistro: numRegistro.value,
			telefone: telefone.value,
		};

		api
			.put(`motoristas/${id}`, motoristaSalvar)
			.then((r) => {
				alert("Motorista editado com sucesso!");
				Router.push("/motorista/listagem");
			})
			.catch((e) => {
				alert("Erro ao editar o motorista!");
				alert(e?.response?.data?.message ?? e.message);
			});
	};

	return (
		<>
			<h3>Edição de motoristas</h3>
			<form onSubmit={handleSubmit}>
				<p>
					<label htmlFor="cpf">CPF: </label>
					<input
						type="text"
						id="cpf"
						name="cpf"
						required
						defaultValue={motorista.cpf}
					/>
				</p>
				<p>
					<label htmlFor="nome">Nome: </label>
					<input
						type="text"
						id="nome"
						name="nome"
						required
						defaultValue={motorista.nome}
					/>
				</p>
				<p>
					<label htmlFor="numRegistro">Número de registro: </label>
					<input
						type="text"
						id="numRegistro"
						name="numRegistro"
						required
						defaultValue={motorista.numRegistro}
					/>
				</p>
				<p>
					<label htmlFor="telefone">Telefone: </label>
					<input
						type="text"
						id="telefone"
						name="telefone"
						defaultValue={motorista.telefone}
					/>
				</p>

				<button type="submit">Salvar</button>
			</form>
		</>
	);
}
