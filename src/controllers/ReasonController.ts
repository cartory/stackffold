import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import Reason from '../models/Reason'

@Controller('/reasons')
	@Get('/')
			return res.status(200).json(await Reason.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')
			return res.status(200).json(await Reason.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')
			return res.status(201).json((await Reason.upsert(reason.toJSON()))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')
			return res.status(202).send(await Reason.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}