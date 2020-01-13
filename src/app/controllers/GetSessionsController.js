import Connection from '../models/Connection';

class GetSessionsController {
  async index(req, res) {
    try {
      const connections = await Connection.findOne({ where: { user_id: req.userId }, attributes: ['sessions'] });

      return res.status(200).json(connections);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao obter as sessões ativas' });
    }
  }
}

export default new GetSessionsController();
