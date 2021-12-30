import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import { ISubject } from '../models/Subject'
import { Subject } from '../utils/models'

@Controller('/subjects')
	@Get('/')
			return res.status(200).json(await Subject.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')
			return res.status(200).json(await Subject.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')
			return res.status(201).json((await Subject.upsert(subject))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')
			return res.status(202).send(await Subject.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}