import api from "@/services/api";
import Router from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/List.module.css";

export default function Listagem() {
	const [motoristas, setMotoristas] = useState([]);

	const getMotoristas = () => {
		api
			.get("motoristas")
			.then((r) => {
				setMotoristas(r.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		getMotoristas();
	}, []);

	const excluirMotorista = (id) => {
		api
			.delete(`/motoristas/${id}`)
			.then((r) => {
				alert("Motorista excluído com sucesso!");
				Router.reload();
			})
			.catch((e) => alert("Erro ao excluir motorista!"));
	};

	const editarMotorista = (id) => {
		Router.push(`/motorista/edicao/${id}`);
	};

	return (
		<>
			<h2 className={styles.title}>Listagem de motoristas</h2>
			<div className={styles.list}>
				{motoristas?.length > 0 &&
					motoristas.map((m) => (
						<div className={styles.item}>
							<p>{m.nome}</p>
							<span>{m.cpf}</span>
							<button type="button" onClick={() => editarMotorista(m.id)}>
								Editar
							</button>
							<button type="button" onClick={() => excluirMotorista(m.id)}>
								Excluir
							</button>
						</div>
					))}
			</div>
		</>
	);
}
