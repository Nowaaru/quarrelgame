// heavy 138927552266940
// slash 116729189239923
// fly 135030929304561
import { Animation, Skill, Hitbox, Motion, Input } from "@quarrelgame-framework/common";
import FrameData from "shared/framedata.json";
import { HideDolphin, ShowDolphin } from "../../util/dolphin";
import TotsugekiSplit from "../totsugeki-split";
import { TotsugekiCancel } from "../totsugeki-cancel";

export const TotsugekiLightFly = new Skill.SkillBuilder()
    .SetName("Totsugeki - Light (Fly)")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .RekkasInto([Motion.Down, Motion.DownBack, Motion.Back, Input.Kick], TotsugekiSplit)
    .RekkasInto([Motion.Down, Motion.DownBack, Motion.Back, Input.Punch], TotsugekiCancel)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(0)
            .SetActive(18)
            .SetRecovery(20)
            .SetContact(2) // lol light fly encourages dismount
            .SetBlockAdvantage(-3)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0, 0))
                    .SetSize(new Vector3(0, 0, 0))
                    .Construct(),
            )
            .SetEffectAtFrame(0, (entity) =>
            {
                const { FacingDirection, RootPart } = entity.ControllerManager;
                if (!RootPart)

                    return;

                RootPart.AssemblyLinearVelocity = RootPart.AssemblyLinearVelocity.add(FacingDirection.Unit.mul(RootPart.AssemblyMass * 0.8));
            })
            .SetEffectAtFrame(24, (entity) =>
            {
                HideDolphin(entity)
                const { RootPart } = entity.ControllerManager;
                if (!RootPart)

                    return;

                RootPart.AssemblyLinearVelocity = Vector3.zero;
            })
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("236HSFly")
                    .SetAnimationId("rbxassetid://135030929304561")
                    .SetPriority(Enum.AnimationPriority.Action2)
                    .Construct(),
            ),
    )
    .Construct();

export default TotsugekiLightFly;
