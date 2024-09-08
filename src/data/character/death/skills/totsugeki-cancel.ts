
import { Skill, Hitbox } from "@quarrelgame-framework/common";
import { HideDolphin } from "../util/dolphin";

export const TotsugekiCancel = new Skill.SkillBuilder()
    .SetName("Totsugeki - Cancel")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(3)
            .SetActive(0)
            .SetRecovery(16)
            .SetContact(0)
            .SetBlockAdvantage(0)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0, 0))
                    .SetSize(new Vector3(0, 0, 0))
                    .Construct(),
            )
            .SetEffectAtFrame(0, (entity) =>
            {
                HideDolphin(entity)
                const { RootPart } = entity.ControllerManager;
                if (!RootPart)

                    return;

                RootPart.AssemblyLinearVelocity = entity.ControllerManager.FacingDirection.mul(-3);
            })
    )
    .Construct();

export default TotsugekiCancel;
