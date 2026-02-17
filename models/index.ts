import Agent from './agents';
import Client from './client';
import Plan from './plan-paciente';

// Definir relaciones
Client.hasOne(Plan, { foreignKey: 'client_id', as: 'plan_nutricional' });
Plan.belongsTo(Client, { foreignKey: 'client_id' });

Client.hasOne(Agent, { foreignKey: 'client_id', as: 'agente_asociado' });
Agent.belongsTo(Client, { foreignKey: 'client_id' });

export {
    Client,
    Plan,
    Agent
};