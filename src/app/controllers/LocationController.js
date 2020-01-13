import Location from '../models/Location';

import getAddress from '../functions/address';

class LocationController {
  async store(req, res) {
    try {
      const user = await Location.findOne({ where: { user_id: req.userId } });

      const { latitude, longitude } = req.body;

      if (!(latitude && longitude)) {
        return res.status(400).json({ error: 'Erro na passagem de parâmetros' });
      }

      if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180) {
        const {
          village, town, city,
        } = await getAddress(latitude, longitude);

        const address = `${village || town || city || ''}`;


        await user.update({ latitude, longitude, address });

        return res.status(200).json({ ok: 'true' });
      }

      return res.status(400).json({ error: 'Localização inválida' });
    } catch (error) {
      return res.status(400).json({ error: 'Localização inválida' });
    }
  }
}
export default new LocationController();
