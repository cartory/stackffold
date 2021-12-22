import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import Unit from '../models/Unit'

@Controller('/units')
	@Get('/')
			return res.status(200).json(await Unit.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')
			return res.status(200).json(await Unit.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')
			return res.status(201).json((await Unit.upsert(unit.toJSON()))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')
			return res.status(202).send(await Unit.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}